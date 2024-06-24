import { Entity, Column, PrimaryColumn } from 'typeorm';
import { v4 } from 'uuid';

@Entity('emails')
class EmailEntity {
  @PrimaryColumn({ type: 'text' })
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  static create(data: Omit<EmailEntity, 'id'>): EmailEntity {
    const emailEntry = new EmailEntity();

    emailEntry.id = v4();
    emailEntry.email = data.email;

    return emailEntry;
  }
}

export default EmailEntity;
