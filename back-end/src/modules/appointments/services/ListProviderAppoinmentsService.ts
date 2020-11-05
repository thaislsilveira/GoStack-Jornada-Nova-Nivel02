import { injectable, inject } from 'tsyringe';

import Appoinment from '../infra/typeorm/entities/Appointment';
import IAppoinmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppoinmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appoinmentsRepository: IAppoinmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appoinment[]> {
    const appoinments = await this.appoinmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        year,
        month,
      },
    );

    return appoinments;
  }
}

export default ListProviderAppoinmentsService;
