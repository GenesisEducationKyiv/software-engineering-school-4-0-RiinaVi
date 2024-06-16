import Email from '../entities/Email';
import { ormconfig as dataSource } from '../ormconfig';

export default dataSource.getRepository(Email);
