import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateApppointmentService from './CreateAppointmentService';

describe('CreateAppoinment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppoinment = new CreateApppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  // it('should not be able to create two appointments on the same time', () => {
  //   expect(1 + 2).toBe(3);
  // });
});
