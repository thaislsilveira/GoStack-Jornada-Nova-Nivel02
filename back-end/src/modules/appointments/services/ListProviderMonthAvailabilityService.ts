import { injectable, inject } from 'tsyringe';

import IAppoinmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppoinmentsRepository')
    private appoinmentsRepository: IAppoinmentsRepository,
  ) {}

  public async execute({ provider_id, year, month }: IRequest): Promise<void> {
    const appoinments = await this.appoinmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );

    console.log(appoinments);

    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilityService;
