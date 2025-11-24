const timeElement = document.getElementById('time');
const ampmElement = document.getElementById('ampm');
const batteryLevelElement = document.getElementById('battery-level');
const batteryStatusElement = document.getElementById('battery-status');

// Función para actualizar la hora y la visualización
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Determinar AM o PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convertir a formato de 12 horas
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    const displayHours = String(hours).padStart(2, '0');

    // Actualizar los elementos de la interfaz
    timeElement.textContent = `${displayHours}:${minutes}:${seconds}`;
    ampmElement.textContent = ampm;
}

// Función para obtener y mostrar la información de la batería
function getBatteryInfo() {
    // navigator.getBattery() solo funciona en entornos seguros (HTTPS)
    if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
            
            // Nivel de batería (0 a 1)
            const level = Math.floor(battery.level * 100);
            batteryLevelElement.textContent = `Batería: ${level}%`;

            // Estado de carga
            const isCharging = battery.charging;
            batteryStatusElement.textContent = isCharging ? '🔌 Cargando' : '🔋 No cargando';

            // Escuchar cambios en la batería (opcional)
            battery.addEventListener('levelchange', function() {
                const newLevel = Math.floor(battery.level * 100);
                batteryLevelElement.textContent = `Batería: ${newLevel}%`;
            });
            battery.addEventListener('chargingchange', function() {
                batteryStatusElement.textContent = battery.charging ? '🔌 Cargando' : '🔋 No cargando';
            });
        });
    } else {
        // Mensaje si la API de batería no está disponible
        batteryLevelElement.textContent = 'Batería: N/A';
        batteryStatusElement.textContent = 'API no disponible';
    }
}

// Ejecutar las funciones al inicio y luego la hora cada segundo
updateClock();
getBatteryInfo();
setInterval(updateClock, 1000); // Actualiza la hora cada 1000 milisegundos (1 segundo)
