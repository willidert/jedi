import { IParticipant } from '../../../IParticipant';
export interface IProject {
  id: number;
  name: string;
  begin_date: Date;
  end_date: Date;
  value: number;
  risk: number;

  participants: Array<IParticipant>;
}
