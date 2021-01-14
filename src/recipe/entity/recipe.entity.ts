import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
@Entity({
  name: 'recipe',
  orderBy: {
    createdAt: 'ASC',
  },
})
@Unique(['name'])
export class RecipeEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  url: string

  // markdown
  @Column()
  text: string

  @CreateDateColumn()
  createAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
