def dias(total_horas: float):
    total_horas = round(total_horas)

    dias = total_horas // 24
    horas_restantes = total_horas % 24

    if dias > 0 and horas_restantes > 0:
        return f"{dias} día{'s' if dias != 1 else ''} y {horas_restantes} hora{'s' if horas_restantes != 1 else ''}"
    elif dias > 0:
        return f"{dias} día{'s' if dias != 1 else ''}"
    else:
        return f"{horas_restantes} hora{'s' if horas_restantes != 1 else ''}"