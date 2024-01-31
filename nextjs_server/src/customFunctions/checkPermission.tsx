import { Roles } from '../ts/constants';
  
  export const checkPermission = (userRole: string[]) => {
      console.log(userRole)
      if (userRole === null || userRole.length === 0)
          return false;
  
      var role_number = 0;
      switch (userRole[0]) {
          case 'Admin':
              role_number = Roles.ADMIN;
              break;
          case 'Staff':
              role_number = Roles.STAFF;
              break;
          case 'Student':
              role_number = Roles.STUDENT;
              break;
          case 'Mock_User':
              role_number = Roles.MOCK_USER;
              break;
          default:
              return false;
      }
      
    return role_number;
  
  }