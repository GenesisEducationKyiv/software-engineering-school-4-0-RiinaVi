import { Entity, Column, PrimaryColumn } from 'typeorm';
import { randomUUID } from 'crypto';

@Entity('emails')
class EmailEntity {
  @PrimaryColumn({ type: 'text' })
  id!: string;

  @Column({ type: 'text' })
  email!: string;

  static create(data: Omit<EmailEntity, 'id'>): EmailEntity {
    const emailEntry = new EmailEntity();

    emailEntry.id = randomUUID();
    emailEntry.email = data.email;

    return emailEntry;
  }
}

export default EmailEntity;
