import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppoinmentsService from './ListProviderAppoinmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppoinments: ListProviderAppoinmentsService;

describe('ListProviderAppoinments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppoinments = new ListProviderAppoinmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appoinments on a specific day', async () => {
    const appoinment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appoinment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appoinments = await listProviderAppoinments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appoinments).toEqual([appoinment1, appoinment2]);
  });
});
