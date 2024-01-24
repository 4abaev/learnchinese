type Subscriptions = {
    isActive: boolean;
    startDay: string;
    dueToDay: string;
    createdAt: string;
};

type User = {
    id: string;
    username: string;
    email: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    subscriptions: Subscriptions[];
};

type AuthState = {
    user: User | null;
    error: string | undefined;
    isSuccess: boolean;
    isLoading: boolean;
    isError: boolean;
    isAuth: boolean;
};

namespace UserAPI {
    type SignupForm = {
        username: string;
        email: string;
        password: string;
    };
    type forgotPasswordForm = {
        email: string;
    };
    type resetPasswordForm = {
        code: string;
        password: string;
        passwordConfirmation: string;
    };
    type SigninForm = {
        identifier: string;
        password: string;
    };
}
