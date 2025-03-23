import BlogCategory from '../models/blog-category.model.js';

async function getAllCategories(req, res) {
    try {
        const categories = await BlogCategory.find().sort({ name: 1 });
        return res.status(200).json({
            status: 200,
            data: categories
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function getCategoryById(req, res) {
    try {
        const category = await BlogCategory.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Kategorie nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            data: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function createCategory(req, res) {
    try {
        const { name } = req.body;
        
        // Prüfe ob die Kategorie bereits existiert
        const existingCategory = await BlogCategory.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                status: 400,
                message: 'Diese Kategorie existiert bereits'
            });
        }

        const category = new BlogCategory({ name });
        await category.save();

        return res.status(201).json({
            status: 201,
            message: 'Kategorie wurde erfolgreich erstellt',
            data: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function updateCategory(req, res) {
    try {
        const { name, description } = req.body;
        const category = await BlogCategory.findById(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Kategorie nicht gefunden'
            });
        }

        category.name = name;
        category.description = description;
        await category.save();

        return res.status(200).json({
            status: 200,
            message: 'Kategorie wurde erfolgreich aktualisiert',
            data: category
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Ein Fehler ist aufgetreten',
            error: error.message
        });
    }
}

async function deleteCategory(req, res) {
    try {
        const category = await BlogCategory.findByIdAndDelete(req.params.id);
        
        if (!category) {
            return res.status(404).json({
                status: 404,
                message: 'Kategorie nicht gefunden'
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'Kategorie wurde erfolgreich gelöscht'
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
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}; 