// Cronos Airlines - Passenger Management System
class PassengerManager {
    constructor() {
        this.passengers = [];
        this.filteredPassengers = [];
        this.nextId = 1;
        this.init();
    }

    init() {
        this.loadSampleData();
        this.setupEventListeners();
        this.renderPassengers();
        this.updateStatistics();
    }

    // Sample data for demonstration
    loadSampleData() {
        const samplePassengers = [
            {
                id: 1,
                firstName: "María",
                lastName: "González",
                dni: "12345678",
                email: "maria.gonzalez@email.com",
                flightNumber: "CR-001",
                seatNumber: "12A",
                passengerClass: "Primera",
                status: "Confirmado",
                flightDate: "2024-01-15"
            },
            {
                id: 2,
                firstName: "Carlos",
                lastName: "Rodríguez",
                dni: "87654321",
                email: "carlos.rodriguez@email.com",
                flightNumber: "CR-002",
                seatNumber: "8B",
                passengerClass: "Business",
                status: "Confirmado",
                flightDate: "2024-01-16"
            },
            {
                id: 3,
                firstName: "Ana",
                lastName: "Martínez",
                dni: "11223344",
                email: "ana.martinez@email.com",
                flightNumber: "CR-001",
                seatNumber: "15C",
                passengerClass: "Economy",
                status: "En espera",
                flightDate: "2024-01-15"
            },
            {
                id: 4,
                firstName: "Luis",
                lastName: "Fernández",
                dni: "44332211",
                email: "luis.fernandez@email.com",
                flightNumber: "CR-003",
                seatNumber: "3A",
                passengerClass: "Primera",
                status: "Cancelado",
                flightDate: "2024-01-17"
            },
            {
                id: 5,
                firstName: "Sofia",
                lastName: "López",
                dni: "55667788",
                email: "sofia.lopez@email.com",
                flightNumber: "CR-002",
                seatNumber: "22D",
                passengerClass: "Economy",
                status: "Confirmado",
                flightDate: "2024-01-16"
            },
            {
                id: 6,
                firstName: "Diego",
                lastName: "Pérez",
                dni: "88776655",
                email: "diego.perez@email.com",
                flightNumber: "CR-004",
                seatNumber: "1A",
                passengerClass: "Primera",
                status: "Confirmado",
                flightDate: "2024-01-18"
            },
            {
                id: 7,
                firstName: "Valentina",
                lastName: "García",
                dni: "99887766",
                email: "valentina.garcia@email.com",
                flightNumber: "CR-003",
                seatNumber: "18B",
                passengerClass: "Business",
                status: "En espera",
                flightDate: "2024-01-17"
            },
            {
                id: 8,
                firstName: "Andrés",
                lastName: "Herrera",
                dni: "66554433",
                email: "andres.herrera@email.com",
                flightNumber: "CR-001",
                seatNumber: "25C",
                passengerClass: "Economy",
                status: "Confirmado",
                flightDate: "2024-01-15"
            },
            {
                id: 9,
                firstName: "Juan María",
                lastName: "Esono Biyogo Angue",
                dni: "11223344",
                email: "juan.esono@email.com",
                flightNumber: "CR-2025",
                seatNumber: "5A",
                passengerClass: "Primera",
                status: "Confirmado",
                flightDate: "2025-07-12"
            },
            {
                id: 10,
                firstName: "Teresa Laura",
                lastName: "Mbang Alo",
                dni: "55667788",
                email: "teresa.mbang@email.com",
                flightNumber: "CR-2025",
                seatNumber: "7B",
                passengerClass: "Business",
                status: "Confirmado",
                flightDate: "2025-07-12"
            }
        ];

        this.passengers = samplePassengers;
        this.nextId = Math.max(...this.passengers.map(p => p.id)) + 1;
        this.filteredPassengers = [...this.passengers];
    }

    setupEventListeners() {
        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterPassengers();
        });

        // Filter functionality
        document.getElementById('classFilter').addEventListener('change', () => {
            this.filterPassengers();
        });

        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterPassengers();
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Add passenger
        document.getElementById('savePassengerBtn').addEventListener('click', () => {
            this.addPassenger();
        });

        // Update passenger
        document.getElementById('updatePassengerBtn').addEventListener('click', () => {
            this.updatePassenger();
        });

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportToCSV();
        });

        // Print functionality
        document.getElementById('printBtn').addEventListener('click', () => {
            this.printPassengers();
        });

        // Modal events
        document.getElementById('addPassengerModal').addEventListener('hidden.bs.modal', () => {
            this.clearAddForm();
        });

        document.getElementById('editPassengerModal').addEventListener('hidden.bs.modal', () => {
            this.clearEditForm();
        });
    }

    filterPassengers() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const classFilter = document.getElementById('classFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        this.filteredPassengers = this.passengers.filter(passenger => {
            const matchesSearch = 
                passenger.firstName.toLowerCase().includes(searchTerm) ||
                passenger.lastName.toLowerCase().includes(searchTerm) ||
                passenger.dni.includes(searchTerm) ||
                passenger.seatNumber.toLowerCase().includes(searchTerm) ||
                passenger.flightNumber.toLowerCase().includes(searchTerm);

            const matchesClass = !classFilter || passenger.passengerClass === classFilter;
            const matchesStatus = !statusFilter || passenger.status === statusFilter;

            return matchesSearch && matchesClass && matchesStatus;
        });

        this.renderPassengers();
        this.updateStatistics();
    }

    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('classFilter').value = '';
        document.getElementById('statusFilter').value = '';
        this.filteredPassengers = [...this.passengers];
        this.renderPassengers();
        this.updateStatistics();
    }

    renderPassengers() {
        const tbody = document.getElementById('passengersTableBody');
        tbody.innerHTML = '';

        if (this.filteredPassengers.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" class="text-center py-4">
                        <i class="bi bi-search me-2"></i>
                        No se encontraron pasajeros con los filtros aplicados
                    </td>
                </tr>
            `;
            return;
        }

        this.filteredPassengers.forEach(passenger => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar me-3">
                            <i class="bi bi-person-circle fs-4 text-primary"></i>
                        </div>
                        <div>
                            <div class="fw-bold">${passenger.firstName} ${passenger.lastName}</div>
                            <small class="text-muted">${passenger.email}</small>
                        </div>
                    </div>
                </td>
                <td><span class="badge bg-light text-dark">${passenger.dni}</span></td>
                <td>
                    <span class="badge bg-info">
                        <i class="bi bi-airplane me-1"></i>${passenger.flightNumber}
                    </span>
                </td>
                <td>
                    <span class="badge bg-secondary">
                        <i class="bi bi-seat me-1"></i>${passenger.seatNumber}
                    </span>
                </td>
                <td>
                    <span class="class-badge ${this.getClassBadgeClass(passenger.passengerClass)}">
                        ${passenger.passengerClass}
                    </span>
                </td>
                <td>
                    <span class="status-badge ${this.getStatusBadgeClass(passenger.status)}">
                        ${passenger.status}
                    </span>
                </td>
                <td>
                    <span class="badge bg-light text-dark">
                        <i class="bi bi-calendar me-1"></i>${this.formatDate(passenger.flightDate)}
                    </span>
                </td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="btn btn-sm btn-outline-primary action-btn" 
                                onclick="passengerManager.editPassenger(${passenger.id})" 
                                title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger action-btn" 
                                onclick="passengerManager.deletePassenger(${passenger.id})" 
                                title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-info action-btn" 
                                onclick="passengerManager.viewPassenger(${passenger.id})" 
                                title="Ver detalles">
                            <i class="bi bi-eye"></i>
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    getClassBadgeClass(passengerClass) {
        switch (passengerClass) {
            case 'Primera': return 'class-first';
            case 'Business': return 'class-business';
            case 'Economy': return 'class-economy';
            default: return 'class-economy';
        }
    }

    getStatusBadgeClass(status) {
        switch (status) {
            case 'Confirmado': return 'status-confirmed';
            case 'En espera': return 'status-waiting';
            case 'Cancelado': return 'status-cancelled';
            default: return 'status-waiting';
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    updateStatistics() {
        const total = this.filteredPassengers.length;
        const confirmed = this.filteredPassengers.filter(p => p.status === 'Confirmado').length;
        const waiting = this.filteredPassengers.filter(p => p.status === 'En espera').length;
        const cancelled = this.filteredPassengers.filter(p => p.status === 'Cancelado').length;

        document.getElementById('totalPassengers').textContent = total;
        document.getElementById('confirmedPassengers').textContent = confirmed;
        document.getElementById('waitingPassengers').textContent = waiting;
        document.getElementById('cancelledPassengers').textContent = cancelled;
    }

    addPassenger() {
        const form = document.getElementById('addPassengerForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const passenger = {
            id: this.nextId++,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            dni: document.getElementById('dni').value,
            email: document.getElementById('email').value,
            flightNumber: document.getElementById('flightNumber').value,
            seatNumber: document.getElementById('seatNumber').value,
            passengerClass: document.getElementById('passengerClass').value,
            status: document.getElementById('passengerStatus').value,
            flightDate: document.getElementById('flightDate').value
        };

        this.passengers.push(passenger);
        this.filteredPassengers = [...this.passengers];
        this.renderPassengers();
        this.updateStatistics();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('addPassengerModal'));
        modal.hide();

        this.showNotification('Pasajero agregado exitosamente', 'success');
    }

    editPassenger(id) {
        const passenger = this.passengers.find(p => p.id === id);
        if (!passenger) return;

        // Fill edit form
        document.getElementById('editPassengerId').value = passenger.id;
        document.getElementById('editFirstName').value = passenger.firstName;
        document.getElementById('editLastName').value = passenger.lastName;
        document.getElementById('editDni').value = passenger.dni;
        document.getElementById('editEmail').value = passenger.email;
        document.getElementById('editFlightNumber').value = passenger.flightNumber;
        document.getElementById('editSeatNumber').value = passenger.seatNumber;
        document.getElementById('editPassengerClass').value = passenger.passengerClass;
        document.getElementById('editPassengerStatus').value = passenger.status;
        document.getElementById('editFlightDate').value = passenger.flightDate;

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('editPassengerModal'));
        modal.show();
    }

    updatePassenger() {
        const form = document.getElementById('editPassengerForm');
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const id = parseInt(document.getElementById('editPassengerId').value);
        const passengerIndex = this.passengers.findIndex(p => p.id === id);
        
        if (passengerIndex === -1) return;

        this.passengers[passengerIndex] = {
            id: id,
            firstName: document.getElementById('editFirstName').value,
            lastName: document.getElementById('editLastName').value,
            dni: document.getElementById('editDni').value,
            email: document.getElementById('editEmail').value,
            flightNumber: document.getElementById('editFlightNumber').value,
            seatNumber: document.getElementById('editSeatNumber').value,
            passengerClass: document.getElementById('editPassengerClass').value,
            status: document.getElementById('editPassengerStatus').value,
            flightDate: document.getElementById('editFlightDate').value
        };

        this.filteredPassengers = [...this.passengers];
        this.renderPassengers();
        this.updateStatistics();

        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('editPassengerModal'));
        modal.hide();

        this.showNotification('Pasajero actualizado exitosamente', 'success');
    }

    deletePassenger(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este pasajero?')) {
            this.passengers = this.passengers.filter(p => p.id !== id);
            this.filteredPassengers = [...this.passengers];
            this.renderPassengers();
            this.updateStatistics();
            this.showNotification('Pasajero eliminado exitosamente', 'success');
        }
    }

    viewPassenger(id) {
        const passenger = this.passengers.find(p => p.id === id);
        if (!passenger) return;

        const details = `
            <div class="passenger-details-container">
                <!-- Header with Airline Branding -->
                <div class="airline-header text-center mb-4">
                    <div class="airline-logo mb-3">
                        <i class="fas fa-plane-departure fa-3x text-primary"></i>
                    </div>
                    <h1 class="airline-name">Cronos Airlines</h1>
                    <p class="airline-subtitle">Sistema de Gestión de Pasajeros</p>
                </div>

                <!-- Passenger Information Card -->
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="card passenger-card shadow-lg">
                            <div class="card-header bg-primary text-white text-center">
                                <h3 class="mb-0">
                                    <i class="bi bi-person-circle me-2"></i>
                                    Información del Pasajero
                                </h3>
                            </div>
                            <div class="card-body p-4">
                                <div class="row">
                                    <!-- Personal Information -->
                                    <div class="col-md-6">
                                        <div class="info-section">
                                            <h5 class="section-title">
                                                <i class="bi bi-person me-2 text-primary"></i>
                                                Información Personal
                                            </h5>
                                            <div class="info-item">
                                                <span class="info-label">Nombre Completo:</span>
                                                <span class="info-value">${passenger.firstName} ${passenger.lastName}</span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">DNI:</span>
                                                <span class="info-value">${passenger.dni}</span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">Email:</span>
                                                <span class="info-value">${passenger.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- Flight Information -->
                                    <div class="col-md-6">
                                        <div class="info-section">
                                            <h5 class="section-title">
                                                <i class="bi bi-airplane me-2 text-primary"></i>
                                                Información del Vuelo
                                            </h5>
                                            <div class="info-item">
                                                <span class="info-label">Número de Vuelo:</span>
                                                <span class="info-value flight-number">${passenger.flightNumber}</span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">Asiento:</span>
                                                <span class="info-value seat-number">${passenger.seatNumber}</span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">Clase:</span>
                                                <span class="class-badge ${this.getClassBadgeClass(passenger.passengerClass)}">
                                                    ${passenger.passengerClass}
                                                </span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">Estado:</span>
                                                <span class="status-badge ${this.getStatusBadgeClass(passenger.status)}">
                                                    ${passenger.status}
                                                </span>
                                            </div>
                                            <div class="info-item">
                                                <span class="info-label">Fecha del Vuelo:</span>
                                                <span class="info-value flight-date">${this.formatDate(passenger.flightDate)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Additional Details -->
                                <div class="row mt-4">
                                    <div class="col-12">
                                        <div class="info-section">
                                            <h5 class="section-title">
                                                <i class="bi bi-info-circle me-2 text-primary"></i>
                                                Detalles Adicionales
                                            </h5>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <div class="detail-card text-center">
                                                        <div class="detail-icon">
                                                            <i class="bi bi-calendar-event text-primary"></i>
                                                        </div>
                                                        <div class="detail-text">
                                                            <strong>Fecha de Reserva</strong><br>
                                                            <span class="text-muted">${this.formatDate(passenger.flightDate)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="detail-card text-center">
                                                        <div class="detail-icon">
                                                            <i class="bi bi-geo-alt text-primary"></i>
                                                        </div>
                                                        <div class="detail-text">
                                                            <strong>Destino</strong><br>
                                                            <span class="text-muted">MALABO</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md-4">
                                                    <div class="detail-card text-center">
                                                        <div class="detail-icon">
                                                            <i class="bi bi-clock text-primary"></i>
                                                        </div>
                                                        <div class="detail-text">
                                                            <strong>Hora de Salida</strong><br>
                                                            <span class="text-muted">11:00</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="text-center mt-4">
                    <p class="text-muted">
                        <i class="bi bi-shield-check me-1"></i>
                        Información confidencial - Cronos Airlines
                    </p>
                </div>
            </div>
        `;

        this.showFullScreenModal('Detalles del Pasajero', details);
    }

    clearAddForm() {
        document.getElementById('addPassengerForm').reset();
    }

    clearEditForm() {
        document.getElementById('editPassengerForm').reset();
    }

    exportToCSV() {
        const headers = ['ID', 'Nombre', 'Apellido', 'DNI', 'Email', 'Vuelo', 'Asiento', 'Clase', 'Estado', 'Fecha'];
        const csvContent = [
            headers.join(','),
            ...this.filteredPassengers.map(p => [
                p.id,
                p.firstName,
                p.lastName,
                p.dni,
                p.email,
                p.flightNumber,
                p.seatNumber,
                p.passengerClass,
                p.status,
                p.flightDate
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `cronos_passengers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        this.showNotification('Datos exportados exitosamente', 'success');
    }

    printPassengers() {
        const printWindow = window.open('', '_blank');
        const table = document.getElementById('passengersTable').cloneNode(true);
        
        // Remove action buttons for print
        const actionCells = table.querySelectorAll('th:last-child, td:last-child');
        actionCells.forEach(cell => cell.remove());

        printWindow.document.write(`
            <html>
                <head>
                    <title>Cronos Airlines - Lista de Pasajeros</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; font-weight: bold; }
                        h1 { color: #007bff; text-align: center; }
                        .header { text-align: center; margin-bottom: 30px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>Cronos Airlines</h1>
                        <h2>Lista de Pasajeros</h2>
                        <p>Fecha de impresión: ${new Date().toLocaleDateString('es-ES')}</p>
                    </div>
                    ${table.outerHTML}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    showModal(title, content) {
        const modalHtml = `
            <div class="modal fade" id="detailsModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header bg-info text-white">
                            <h5 class="modal-title">
                                <i class="bi bi-info-circle me-2"></i>${title}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('detailsModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('detailsModal'));
        modal.show();

        // Remove modal from DOM after it's hidden
        document.getElementById('detailsModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    showFullScreenModal(title, content) {
        const modalHtml = `
            <div class="modal fade full-screen-modal" id="fullScreenModal" tabindex="-1">
                <div class="modal-dialog modal-fullscreen">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">
                                <i class="bi bi-info-circle me-2"></i>${title}
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            ${content}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if any
        const existingModal = document.getElementById('fullScreenModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('fullScreenModal'));
        modal.show();

        // Remove modal from DOM after it's hidden
        document.getElementById('fullScreenModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    showNotification(message, type = 'info') {
        const toastHtml = `
            <div class="toast-container position-fixed top-0 end-0 p-3">
                <div class="toast" role="alert">
                    <div class="toast-header bg-${type} text-white">
                        <i class="bi bi-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
                        <strong class="me-auto">Cronos Airlines</strong>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
                    </div>
                    <div class="toast-body">
                        ${message}
                    </div>
                </div>
            </div>
        `;

        // Remove existing toasts
        const existingToasts = document.querySelectorAll('.toast-container');
        existingToasts.forEach(toast => toast.remove());

        // Add new toast
        document.body.insertAdjacentHTML('beforeend', toastHtml);

        // Show toast
        const toastElement = document.querySelector('.toast');
        const toast = new bootstrap.Toast(toastElement, { delay: 3000 });
        toast.show();

        // Remove toast from DOM after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function() {
            this.closest('.toast-container').remove();
        });
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.passengerManager = new PassengerManager();
    
    // Add some interactive features
    console.log('🚀 Cronos Airlines - Passenger Management System loaded successfully!');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + N to add new passenger
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            const addModal = new bootstrap.Modal(document.getElementById('addPassengerModal'));
            addModal.show();
        }
        
        // Ctrl/Cmd + F to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Escape to clear filters
        if (e.key === 'Escape') {
            window.passengerManager.clearFilters();
        }
    });
}); 