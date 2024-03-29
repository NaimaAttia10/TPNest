import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next:NextFunction) {
    const authUser=req.headers['auth-user'];
    if(typeof authUser!='string') {
      return next(new UnauthorizedException());}
    verify (authUser,"pass",(erreur,decoded)=>{
      if(erreur || !decoded || typeof decoded != 'object' || !decoded.userId){
        return next(new Error('Unauth error'));
      }
      req['userId']=decoded.userId;
  
    next();
  });
}}
