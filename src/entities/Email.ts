// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('emails')
class Email {
  @PrimaryColumn({ type: 'text' })
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  static create(data: Omit<Email, 'id'>): Email {
    const emailEntry = new Email();

    emailEntry.id = v4();
    emailEntry.email = data.email;

    return emailEntry;
  }
}

export default Email;
