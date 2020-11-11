import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appoinment[]> {
    const cacheData = await this.cacheProvider.recover('asd');

    console.log(cacheData);

    const appoinments = await this.appoinmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        year,
        month,
      },
    );

    // await this.cacheProvider.save('asd', 'asd');

    return appoinments;
  }
}

export default ListProviderAppoinmentsService;
