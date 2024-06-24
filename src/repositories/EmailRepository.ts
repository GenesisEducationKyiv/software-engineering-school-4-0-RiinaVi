import EmailEntity from '../entities/EmailEntity';
import { ormconfig as dataSource } from '../ormconfig';

export default dataSource.getRepository(EmailEntity);
