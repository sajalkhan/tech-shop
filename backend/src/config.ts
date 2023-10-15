import dotenv from 'dotenv';
import bunyan from 'bunyan';
import cloudinary from 'cloudinary';

dotenv.config({});

class Config {
  public DATABASE_URL: string | undefined;
  public DB_PASSWORD = '';
  public JWT_TOKEN: string | undefined;
  public NODE_ENV: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public CLOUD_NAME: string | undefined;
  public CLOUD_API_KEY: string | undefined;
  public CLOUD_API_SECRET: string | undefined;
  public EMAIL: string | undefined;
  public MAIL_PASSWORD: string | undefined;
  public SMTP_USER: string | undefined;
  public SMTP_PASSWORD: string | undefined;

  private readonly DEFAULT_DATABASE_URL = `mongodb://mdsoharubhossen:${this.DB_PASSWORD}@ac-w2u3ez4-shard-00-00.dvtskkd.mongodb.net:27017,ac-w2u3ez4-shard-00-01.dvtskkd.mongodb.net:27017,ac-w2u3ez4-shard-00-02.dvtskkd.mongodb.net:27017/?ssl=true&replicaSet=atlas-32r444-shard-0&authSource=admin&retryWrites=true&w=majority`;

  constructor() {
    this.DB_PASSWORD = process.env.DB_PASSWORD || this.DB_PASSWORD;
    this.DATABASE_URL = process.env.DATABASE_URL || this.DEFAULT_DATABASE_URL;
    this.JWT_TOKEN = process.env.JWT_TOKEN || '123';
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    this.EMAIL = process.env.EMAIL || '';
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
    this.SMTP_USER = process.env.SMTP_USER || '';
    this.SMTP_PASSWORD = process.env.SMTP_PASSWORD || '';
  }

  public createLogger(name: string): bunyan {
    return bunyan.createLogger({ name, level: 'debug' });
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined!`);
      }
    }
  }

  public cloudinaryConfig(): void {
    cloudinary.v2.config({
      cloud_name: this.CLOUD_NAME,
      api_key: this.CLOUD_API_KEY,
      api_secret: this.CLOUD_API_SECRET
    });
  }
}

export const config: Config = new Config();
