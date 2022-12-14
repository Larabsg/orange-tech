import { MdEmail, MdLock } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from '../../services/api'

import {
    Column,
    Container,
    CriarText,
    EsqueciText,
    Row,
    SubtitleLogin,
    Title,
    TitleLogin,
    Wrapper,
} from "./styles";
import { Input } from "../../components/Input";
import { IFormData } from "./types";

const schema = yup
    .object({
        email: yup
            .string()
            .email("Email não é válido")
            .required("Campo obrigatório"),
        password: yup
            .string()
            .min(3, "No mínimo 3 caracteres")
            .required("Campo obrigatório"),
    })
    .required();

const Login = () => {
    const navigate = useNavigate();

    const handleClickSignUp = () => {
        navigate("/cadastro")
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const onSubmit = async (formData: IFormData) => {
        try {
            const { data } = await api.get(`users?email=${formData.email}&senha=${formData.password}`)
            if(data.length === 1) {
                navigate("/feed");
            } else {
                alert('Email ou senha inválido')
            }
        } catch {
            alert('Houve um erro, tente novamente.')
        }
    };

    return (
        <>
            <Header />
            <Container>
                <Column>
                    <Title>
                        A plataforma para você aprender com experts, dominar as
                        principais tecnologias e entrar mais rápido nas empresas
                        mais desejadas.
                    </Title>
                </Column>
                <Wrapper>
                    <TitleLogin>Faça seu cadastro</TitleLogin>
                    <SubtitleLogin>
                        Faça seu login e make the change._
                    </SubtitleLogin>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            errorMessage={errors?.email?.message}
                            name="email"
                            control={control}
                            placeholder="E-mail"
                            leftIcon={<MdEmail />}
                        />
                        <Input
                            errorMessage={errors?.password?.message}
                            name="password"
                            control={control}
                            placeholder="Senha"
                            type="password"
                            leftIcon={<MdLock />}
                        />
                        <Button
                            title="Entrar"
                            variant="secondary"
                            type="submit"
                        />
                    </form>
                    <Row>
                        <EsqueciText>Esqueci minha senha</EsqueciText>
                        <CriarText onClick={handleClickSignUp}>Criar conta</CriarText>
                    </Row>
                </Wrapper>
            </Container>
        </>
    );
};

export { Login };
