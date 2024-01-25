
export function getCurrentUSer (user) {
    const email = user.email

    switch (email) {
        case 'nookon@icloud.com':
            return 'Kolomiiets Dmytro'
        default:
            return user.email
    }
}