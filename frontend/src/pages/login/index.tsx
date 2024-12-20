import { Toaster } from "sonner";
import { LoginProps } from '@/types/Login';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLoginForm } from '@/hooks/useLogin';
import Logo from '../../assets/logo/logoPadrao.svg';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

export const Login = ({ setIsLoggedIn, isAdmin }: LoginProps) => {
    //Hooks para gerenciar a navegação e controlar o comportamento do formulário, respectivamente
    const navigate = useNavigate();
    const { form, handleSubmit } = useLoginForm(setIsLoggedIn, navigate, isAdmin);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-5 sm:p-10 md:p-24">
            <img className="w-32 sm:w-40 md:w-48 mb-5" src={Logo} alt="Logo Khiv" />
            <div className="bg-white p-7 rounded-sm shadow-md w-full max-w-400">
                <h2 className="text-2xl font-bold text-blue-900">Login</h2>
                <p className="text-sm text-gray-500 mb-5">Digite seus dados de acesso</p>
                {/* Componente Form que utiliza as propriedades do formulário */}
                <Form {...form}>
                    <form
                        //Função de envio do formulário
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="w-full">
                        <FormField
                            control={form.control}
                            name="emailAddress"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-bold">E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-whiteF"
                                            placeholder="Digite seu e-mail"
                                            type="email" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className="mt-5">
                                    <FormLabel className="font-bold">Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            className="bg-whiteF"
                                            placeholder="Digite sua senha"
                                            type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="bg-orange hover:bg-orangeHover font-bold w-full mt-5"
                        >
                            Entrar
                        </Button>
                    </form>
                </Form>
            </div>
            {/* Componente para exibir notificações */}
            <Toaster />
        </main>
    );
};
