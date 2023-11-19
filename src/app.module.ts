import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './controllers/user.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: 'mongodb+srv://daznTestDb:Rajesh%4032@dazntestdb.xwl5cds.mongodb.net/testDb',
        connectionFactory: (connection) => {
          if (connection.readyState === 1) {
            console.log('MongoDb connected Successfully');
          }
          connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
          });
          connection.on('error', (error) => {
            console.log('MongoDB connection failed! Error:', error);
          });
          return connection;
        },
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
