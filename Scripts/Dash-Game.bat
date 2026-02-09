@echo off
setlocal

echo Ejecutando BackUp...
start "" /min cmd /c "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Dash Game\Scripts && py BackUp.py"

echo Ejecutando Backend...
start "" cmd /k "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Dash Game\Backend && py manage.py runserver"

echo Ejecutando Frontend...
start "" cmd /k "cd /d C:\Users\jason\OneDrive\Documentos\Proyectos\Dash Game\frontend && npm.cmd run dev"

timeout /t 1 > nul
start "" http://localhost:5173

endlocal