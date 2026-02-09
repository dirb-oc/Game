import requests
from django.core.files.base import ContentFile

def download_and_save(instance, field_name, url, filename):
    if not url:
        return False

    try:
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return False

        getattr(instance, field_name).save(
            filename,
            ContentFile(response.content),
            save=True
        )
        return True

    except Exception:
        return False
