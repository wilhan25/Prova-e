import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  // Obter o tipo de usuário do serviço
  const userType = userService.getUserType();
  if (userType === 'Professor') {
    return true;
  }else{
    return false;
  }
};
