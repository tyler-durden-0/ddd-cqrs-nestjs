import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CamperFactory } from '../../camper.factory';
import { CreateCamperCommand } from './create-camper.command';

@CommandHandler(CreateCamperCommand)
export class CreateCamperHandler
  implements ICommandHandler<CreateCamperCommand> {
  constructor(
    private readonly camperFactory: CamperFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute({ createCamperRequest }: CreateCamperCommand): Promise<void> {
    const { name, age, allergies } = createCamperRequest;
    console.log('we are in create camper handler now')
    const camper = this.eventPublisher.mergeObjectContext(
      await this.camperFactory.create(name, age, allergies),
    );
    console.log('camper: ', camper)
    camper.commit();
  }
}
