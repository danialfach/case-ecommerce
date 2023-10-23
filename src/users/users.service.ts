/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignupDto: UserSignupDto): Promise<UserEntity> {
    const userExist = await this.findUserByEmail(userSignupDto.email);
    if (userExist) {
      throw new BadRequestException('Email is not available');
    }
    userSignupDto.password = await hash(userSignupDto.password, 10);
    let user = this.usersRepository.create(userSignupDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSigninDto: UserSigninDto) {
    const userExist = this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSigninDto.email })
      .getOne();
    if (!userExist) {
      throw new BadRequestException('Bad credentials');
    }
    const matchPassword = await compare(
      userSigninDto.password,
      (await userExist).password,
    );
    if (!matchPassword) {
      throw new BadRequestException('Bad credentials');
    }
    delete (await userExist).password;
    return userExist;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity) {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
}
