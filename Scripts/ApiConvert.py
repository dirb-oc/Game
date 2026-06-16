import requests
import json
from urllib.parse import urlparse
import os

API_URL = "http://localhost:8000/generos/"

def convertir_imagen(valor):
    if not isinstance(valor, str):
        return valor

    if "localhost:8000/media" not in valor:
        return valor

    nombre_archivo = os.path.basename(urlparse(valor).path)

    ruta = valor.lower()

    if "covers" in ruta:
        return f"/src/assets/Images/Covers/{nombre_archivo}"

    if "banners" in ruta:
        return f"/src/assets/Images/Banners/{nombre_archivo}"

    return valor


def transformar_objeto(obj):
    if isinstance(obj, dict):
        nuevo = {}

        for key, value in obj.items():
            if isinstance(value, (dict, list)):
                nuevo[key] = transformar_objeto(value)
            else:
                nuevo[key] = convertir_imagen(value)

        return nuevo

    elif isinstance(obj, list):
        return [transformar_objeto(item) for item in obj]

    return obj


def exportar_api_a_json():
    response = requests.get(API_URL)
    response.raise_for_status()

    data = response.json()

    data_transformada = transformar_objeto(data)

    with open("library.json", "w", encoding="utf-8") as archivo:
        json.dump(data_transformada, archivo, ensure_ascii=False, indent=4)

    print("JSON exportado correctamente")


if __name__ == "__main__":
    exportar_api_a_json()