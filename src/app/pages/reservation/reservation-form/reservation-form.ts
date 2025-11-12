import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-reservation-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [], // Asegúrate de que tu app.config o módulo importe CommonModule si usas NgIf/NgFor (o que estés usando el nuevo control flow)
  templateUrl: './reservation-form.html',
  styleUrl: './reservation-form.scss',
})
export class ReservationForm {
  // --- CONSTANTES ---
  readonly HOURLY_RATE = 10;
  readonly RESERVED_SLOTS = ['15:00', '16:00']; // Slots de ejemplo reservados
  readonly ALL_TIME_SLOTS = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];
  readonly monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  private readonly FAKE_OTP_CODE = '123456'; // Código que simularemos

  // --- ESTADO DE LA RESERVA ---
  currentDate = signal(new Date());
  selectedDay = signal<number | null>(this.currentDate().getDate());
  selectedSlots = signal<string[]>([]);
  selectedCourt = signal('Cancha de Vóley');

  // --- NUEVO ESTADO DE VERIFICACIÓN ---
  currentStep = signal<'booking' | 'verification' | 'success'>('booking');
  userDNI = signal('');
  userEmail = signal('');
  verificationCode = signal('');
  isSendingCode = signal(false);
  isVerifying = signal(false);
  codeSent = signal(false);
  errorMessage = signal('');

  // --- COMPUTADOS DEL CALENDARIO ---
  year = computed(() => this.currentDate().getFullYear());
  month = computed(() => this.currentDate().getMonth());
  firstDayOfMonth = computed(() => new Date(this.year(), this.month(), 1).getDay());
  daysInMonth = computed(() => new Date(this.year(), this.month() + 1, 0).getDate());

  calendarDays = computed(() => {
    const days: Array<{ day: number | null; key: string }> = [];
    for (let i = 0; i < this.firstDayOfMonth(); i++) {
      days.push({ day: null, key: `empty-${i}` });
    }
    for (let day = 1; day <= this.daysInMonth(); day++) {
      days.push({ day, key: `day-${day}` });
    }
    return days;
  });

  // --- COMPUTADOS DEL RESUMEN ---
  totalPrice = computed(() => this.selectedSlots().length * this.HOURLY_RATE);

  formattedSelectedDate = computed(() => {
    const day = this.selectedDay();
    if (!day) return '--/--/----';
    const monthStr = String(this.month() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${dayStr}/${monthStr}/${this.year()}`;
  });

  selectedSlotRanges = computed(() => {
    const sortedSlots = [...this.selectedSlots()].sort();
    return sortedSlots.map((startTime) => {
      const endTime = this.getEndTime(startTime);
      return `${startTime} - ${endTime}`;
    });
  });

  // --- MÉTODOS DE RESERVA (HANDLERS) ---
  handleMonthChange(offset: number) {
    this.currentDate.update((prev) => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    this.selectedDay.set(null);
    this.selectedSlots.set([]);
  }

  selectDay(day: number | null) {
    if (day) {
      this.selectedDay.set(day);
      this.selectedSlots.set([]); // Resetea horas al cambiar de día
    }
  }

  handleTimeSlotClick(time: string) {
    if (this.RESERVED_SLOTS.includes(time)) return;
    this.selectedSlots.update((prev) =>
      prev.includes(time) ? prev.filter((s) => s !== time) : [...prev, time],
    );
  }

  onCourtChange(event: Event) {
    this.selectedCourt.set((event.target as HTMLSelectElement).value);
  }

  getTimeSlotClasses(time: string): string {
    const isReserved = this.RESERVED_SLOTS.includes(time);
    const isSelected = this.selectedSlots().includes(time);
    let classes = 'time-slot text-center p-2 border rounded-lg cursor-pointer transition-all ';
    if (isReserved) classes += 'reserved bg-gray-200 text-gray-500 cursor-not-allowed opacity-70';
    else if (isSelected) classes += 'selected bg-green-500 text-white font-bold';
    else classes += 'available hover:bg-green-100';
    return classes;
  }

  // --- MÉTODOS DE VERIFICACIÓN (NUEVOS) ---

  /** Pasa del resumen a la pantalla de verificación */
  proceedToVerification() {
    this.errorMessage.set('');
    if (!this.selectedDay() || this.selectedSlots().length === 0) {
      this.errorMessage.set('Por favor, selecciona un día y al menos un horario.');
      return;
    }
    this.currentStep.set('verification');
  }

  /** SIMULACIÓN: Envía el código de verificación por email */
  requestVerificationCode() {
    this.errorMessage.set('');
    if (!this.isValidEmail(this.userEmail())) {
      this.errorMessage.set('Por favor, ingresa un email válido.');
      return;
    }

    this.isSendingCode.set(true);
    this.codeSent.set(false);
    console.log(`--- SIMULACIÓN: ENVIANDO CÓDIGO A ${this.userEmail()} ---`);

    // Simula una llamada API
    setTimeout(() => {
      console.log(`--- SIMULACIÓN: El código es ${this.FAKE_OTP_CODE} ---`);
      this.isSendingCode.set(false);
      this.codeSent.set(true);
    }, 2000);
  }

  /** SIMULACIÓN: Confirma la reserva final */
  finalConfirmReservation() {
    this.errorMessage.set('');
    this.isVerifying.set(true);

    // 1. Simular validación de DNI (RENIEC)
    const isDNIValid = this.validateDNI(this.userDNI());
    if (!isDNIValid) {
      this.errorMessage.set('El DNI no es válido (debe tener 8 dígitos).');
      this.isVerifying.set(false);
      return;
    }
    console.log(`--- SIMULACIÓN: DNI ${this.userDNI()} validado (RENIEC) ---`);

    // 2. Validar código OTP
    if (this.verificationCode() !== this.FAKE_OTP_CODE) {
      this.errorMessage.set('El código de verificación es incorrecto.');
      this.isVerifying.set(false);
      return;
    }
    console.log(`--- SIMULACIÓN: Código OTP ${this.verificationCode()} validado ---`);

    // 3. Simular guardado en Base de Datos
    setTimeout(() => {
      const reservationDetails = {
        date: this.formattedSelectedDate(),
        court: this.selectedCourt(),
        slotRanges: this.selectedSlotRanges(),
        totalPrice: this.totalPrice(),
        userDNI: this.userDNI(),
        userEmail: this.userEmail(),
      };

      console.log('--- ¡RESERVA CONFIRMADA Y GUARDADA! ---');
      console.log(reservationDetails);

      this.isVerifying.set(false);
      this.currentStep.set('success');
    }, 2000);
  }

  /** Vuelve a la pantalla de reserva */
  goBackToBooking() {
    this.currentStep.set('booking');
    this.errorMessage.set('');
  }

  /** Resetea todo el formulario para una nueva reserva */
  resetForm() {
    this.currentDate.set(new Date());
    this.selectedDay.set(new Date().getDate());
    this.selectedSlots.set([]);
    this.userDNI.set('');
    this.userEmail.set('');
    this.verificationCode.set('');
    this.codeSent.set(false);
    this.errorMessage.set('');
    this.currentStep.set('booking');
  }

  // --- MÉTODOS DE AYUDA (HELPERS) ---
  private getEndTime(startTime: string): string {
    const [hour, minute] = startTime.split(':').map(Number);
    const endHour = hour + 1;
    return `${String(endHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  }

  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /** SIMULACIÓN: Validación de DNI (solo 8 dígitos) */
  private validateDNI(dni: string): boolean {
    return /^\d{8}$/.test(dni);
  }

  // Métodos para actualizar signals desde inputs
  onInputDNI(event: Event) {
    this.userDNI.set((event.target as HTMLInputElement).value);
  }
  onInputEmail(event: Event) {
    this.userEmail.set((event.target as HTMLInputElement).value);
  }
  onInputCode(event: Event) {
    this.verificationCode.set((event.target as HTMLInputElement).value);
  }
}
