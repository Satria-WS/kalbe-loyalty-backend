export interface UsersGetQuery {
  name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  current_page: number;
  take: any;
  cache: boolean;
}

export interface UserPostBody {
  first_name: string;
  last_name?: string;
  password?: string;
  address?: string;
  email?: string;
  roles: any;
  company?: string;
}

export interface UserPutBody {
  first_name: string;
  last_name?: string;
  address?: string;
  email: string;
  roles: any;
  company: string;
}
