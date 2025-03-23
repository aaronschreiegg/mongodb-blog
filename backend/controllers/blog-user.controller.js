import BlogUser from '../models/blog-user.model.js';

async function getAllUsers(req, res) {
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

async function getUserById(req, res) {
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

async function createUser(req, res) {
    try {
        const { username, firstname, lastname, email, password } = req.body;
        
        const user = new BlogUser({
            username,
            firstname,
            lastname,
            email,
            password
        });

        await user.save();
        
        return res.status(201).json({
            status: 201,
            message: 'Benutzer wurde erfolgreich erstellt',
            data: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
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

async function updateUser(req, res) {
    try {
        const { firstname, lastname, email } = req.body;
        const user = await BlogUser.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Benutzer nicht gefunden'
            });
        }

        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        await user.save();

        return res.status(200).json({
            status: 200,
            message: 'Benutzer wurde erfolgreich aktualisiert',
            data: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
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

async function deleteUser(req, res) {
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

async function login(req, res) {
    try {
        const { username, password } = req.body;
        const user = await BlogUser.findOne({ username });
        
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'Benutzer nicht gefunden'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                message: 'Ungültige Anmeldedaten'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Login erfolgreich',
            data: {
                id: user._id,
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
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

export default {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login
}; 