import os
import requests
from urllib.parse import urlparse

# CONFIG
API_URL = "http://localhost:8000/libreria/"

PATHS = [
    "/home/arc/Proyectos/Game/Backend/media/library/banners",
    "/home/arc/Proyectos/Game/Backend/media/library/covers"
]

DELETE = True  # False = solo mostrar


def get_images_from_api():
    response = requests.get(API_URL)
    response.raise_for_status()

    games = response.json()

    image_names = set()

    for game in games:

        # Banner
        banner = game.get("imagen")
        if banner:
            image_names.add(
                os.path.basename(urlparse(banner).path)
            )

        # Cover
        cover = game.get("imagenP")
        if cover:
            image_names.add(
                os.path.basename(urlparse(cover).path)
            )

    return image_names


def get_local_files():
    files = []

    for folder in PATHS:

        if not os.path.exists(folder):
            print(f"[WARN] No existe: {folder}")
            continue

        for file in os.listdir(folder):

            full_path = os.path.join(folder, file)

            if os.path.isfile(full_path):
                files.append((file, full_path))

    return files


def main():

    api_images = get_images_from_api()
    local_files = get_local_files()

    orphan_files = [
        (name, path)
        for name, path in local_files
        if name not in api_images
    ]

    print("\n=== ARCHIVOS HUÉRFANOS ===\n")

    for name, path in orphan_files:

        print(path)

        if DELETE:
            try:
                os.remove(path)
                print(f"[DELETED] {path}")
            except Exception as e:
                print(f"[ERROR] {path}: {e}")

    print(f"\nTotal huérfanos: {len(orphan_files)}")


if __name__ == "__main__":
    main()