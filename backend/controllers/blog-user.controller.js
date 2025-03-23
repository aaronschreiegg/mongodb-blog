import BlogUser from '../models/blog-user.model.js';

export async function getAllUsers(req, res) {
    try {
        const users = await BlogUser.find().select('-password');
        return res.status(200).json({
            status: 200,
            data: users
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export async function getUserById(req, res) {
    try {
        const user = await BlogUser.findById(req.params.id).select('-password');
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Benutzer nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            data: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export async function createUser(req, res) {
    try {
        const { username, firstname, lastname } = req.body;
        
        const user = new BlogUser({
            username,
            firstname,
            lastname
        });

        await user.save();
        
        return res.status(201).json({
            status: 201,
            message: 'Benutzer wurde erfolgreich erstellt',
            data: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export async function updateUser(req, res) {
    try {
        const { firstname, lastname } = req.body;
        const user = await BlogUser.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Benutzer nicht gefunden'
            });
        }

        user.firstname = firstname;
        user.lastname = lastname;
        await user.save();

        return res.status(200).json({
            status: 200,
            message: 'Benutzer wurde erfolgreich aktualisiert',
            data: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

export async function deleteUser(req, res) {
    try {
        const user = await BlogUser.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Benutzer nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Benutzer wurde erfolgreich gelöscht'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}
