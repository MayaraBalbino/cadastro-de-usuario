export const errorMessages = {
    notFound: {
        status: 404,
        message: 'Usuario não encontrado',
    },
    badRequest: {
        status: 400,
        message: 'ID inválido',
    },
    internalServerError: {
        status: 500,
        massage: 'Erro interno no servidor',
    },
}

export const sucessMessages = {
    created: {
        status: 201,
        message: 'Usuario criado com sucesso',
    },
    updated: {
        status: 200,
        message: 'Usuario alterado com sucesso',
    },
    deleted: {
        status: 200,
        message: 'Usuario deletado com sucesso',
    },
    found: {
        status: 200,
        message: 'Usuário encontrado',
    }
}