import os
import subprocess
from pathlib import Path
from datetime import datetime, timedelta
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from dotenv import load_dotenv

load_dotenv()

PG_USER = os.getenv("PG_USER")
PG_PASSWORD = os.getenv("PG_PASSWORD")
PG_HOST = os.getenv("PG_HOST")
PG_PORT = os.getenv("PG_PORT")
DB_NAME = os.getenv("DB_NAME")

GOOGLE_SECRET_PATH = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_TOKEN_PATH = os.getenv("GOOGLE_TOKEN_JSON")
DRIVE_FOLDER_ID = os.getenv("GOOGLE_DRIVE_FOLDER_ID")

# Carpeta externa (ajusta si tu usuario o ruta es distinta)
RESPALDO_DIR = Path(os.getenv("CARPETA_RESPALDO"))
RESPALDO_DIR.mkdir(parents=True, exist_ok=True)

# Cantidad máxima de backups
MAX_BACKUPS = 5
DIAS_MINIMO = 3

def obtener_backups():
    return sorted(RESPALDO_DIR.glob("*.backup"), key=os.path.getmtime)

def backup_es_mayor_a_tres_dias(archivo):
    mod_time = datetime.fromtimestamp(archivo.stat().st_mtime)
    return datetime.now() - mod_time > timedelta(days=DIAS_MINIMO)

def autenticar_drive():
    gauth = GoogleAuth()
    gauth.LoadClientConfigFile(GOOGLE_SECRET_PATH)

    # Cargar token si ya existe
    if os.path.exists(GOOGLE_TOKEN_PATH):
        gauth.LoadCredentialsFile(GOOGLE_TOKEN_PATH)

    # Si no está autenticado o el token expiró, renovar
    if gauth.access_token_expired or not gauth.credentials:
        gauth.LocalWebserverAuth()
        gauth.settings['get_refresh_token'] = True
        gauth.SaveCredentialsFile(GOOGLE_TOKEN_PATH)

    return GoogleDrive(gauth)

def subir_a_drive(ruta_archivo):

    drive = autenticar_drive()

    # 1. Listar archivos en la carpeta del Drive
    query = f"'{DRIVE_FOLDER_ID}' in parents and trashed=false and title contains '.backup'"
    archivos = drive.ListFile({'q': query}).GetList()

    # 2. Ordenar por fecha de creación
    archivos_ordenados = sorted(archivos, key=lambda f: f['createdDate'])

    # 3. Eliminar el más antiguo si hay más de 4 (porque vamos a subir uno más)
    if len(archivos_ordenados) >= MAX_BACKUPS:
        archivo_mas_antiguo = archivos_ordenados[0]
        print(f"🗑️ Eliminando de Google Drive: {archivo_mas_antiguo['title']}")
        archivo_mas_antiguo.Delete()

    # 4. Subir el archivo nuevo
    archivo_drive = drive.CreateFile({
        'title': ruta_archivo.name,
        'parents': [{'id': DRIVE_FOLDER_ID}]
    })
    archivo_drive.SetContentFile(str(ruta_archivo))
    archivo_drive.Upload()
    print(f"☁️ Backup subido a Google Drive: {ruta_archivo.name}")

def crear_backup():
    fecha_str = datetime.now().strftime("%Y%m%d")
    nombre_archivo = RESPALDO_DIR / f"Games_{fecha_str}.backup"

    comando = [
        "C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe",
        "-U", PG_USER,
        "-h", PG_HOST,
        "-p", PG_PORT,
        "-F", "c",
        "-f", str(nombre_archivo),
        DB_NAME
    ]

    env = os.environ.copy()
    env["PGPASSWORD"] = PG_PASSWORD

    try:
        subprocess.run(comando, env=env, check=True)
        print(f"✅ Backup creado: {nombre_archivo}")
        subir_a_drive(nombre_archivo)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al crear backup: {e}")

def main():
    backups = obtener_backups()

    if backups:
        backup_reciente = backups[-1]
        if not backup_es_mayor_a_tres_dias(backup_reciente):
            print("⏳ El último backup es reciente (menos de 3 días). No se crea uno nuevo.")
            return

    if len(backups) >= MAX_BACKUPS:
        backup_mas_antiguo = backups[0]
        print(f"🗑️ Eliminando backup más antiguo: {backup_mas_antiguo.name}")
        backup_mas_antiguo.unlink()

    crear_backup()

if __name__ == "__main__":
    main()