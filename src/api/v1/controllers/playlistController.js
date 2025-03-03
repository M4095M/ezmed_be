const createError = require('http-errors');
const { getAllPlaylists, getPlaylistById, createPlaylist, updatePlaylist, deletePlaylist, createTheoricalContent, getPlaylistByIds, createPraticalContent, updateTheoriqueContent, deletePratiqueContent, deleteTheoriqueContent, updatePratiqueContent } = require('../services/playlistService.js');
const { fetchQuestions } = require('../services/questionService.js');
const { fetchScenarios } = require('../services/scenarioService.js');

const getAllHandler = async (req, res, next) => {
    try {
        const { id } = req.user;
        const playlists = await getAllPlaylists(id);

        // Use map to create an array of promises
        const modifiedPlaylists = await Promise.all(playlists.map(async (playlist) => {
            const activity = playlist.activityPratique.concat(playlist.activityTeorique) ;
            const correct = activity.filter((content) => content.answer === "CORRECT").length;
            const ignored = activity.filter((content) => content.answer === "IGNORED").length;
            const failed = activity.filter((content) => content.answer === "INCORRECT").length;

            // Use await to wait for the modifications to complete
            return {
                ...playlist,
                activity: { correct, ignored, failed }
            };
        }));
        return res.status(200).json({
            status: 200,
            message: 'Playlists fetched successfully',
            data: modifiedPlaylists
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}



const getOneHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const playlist = await getPlaylistById(parseInt(id));
        if (userId !== playlist.userId) {
            throw new Error('You are not allowed to access this playlist')
        }
        return res.status(200).json({
            status: 200,
            message: 'Playlist fetched successfully',
            data: playlist
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const createHandler = async (req, res, next) => {
    try {
        const { id } = req.user;
        const file = req.file;
        const image = file ? await uploadFile(file) : null;
        const { title, description } = req.body;
        const playlist = await createPlaylist({ image, title, userId: id, description });
        return res.status(201).json({
            status: 201,
            message: 'Playlist created successfully',
            data: playlist
        });

    } catch (error) {
        next(createError(400, error.message));
    }
}

const fetchHandler = async (req, res, next) => {
    try {
        const { id } = req.user
        const { title = "Playlist", coursesTheorique, coursesPratique, years, type } = req.body
        const playlist = await createPlaylist({ image: null, userId: id, title: `${title}: ${type}`, type: type, description: `${type} playlist` })
        // fetch all questions from courses with years
        const questions = await fetchQuestions(coursesTheorique, years)
        // fetch all scenarios from courses with years
        const scenarios = await fetchScenarios(coursesPratique, years)
        playlist.theorique = questions
        playlist.pratique = scenarios
        await Promise.all(questions.map(async (question) => {
            const content = await createTheoricalContent({ questionId: question.id, playlistId: playlist.id })
            return content
        }))
        // create playlist content
        await Promise.all(scenarios.map(async (scenario) => {
            const content = await createPraticalContent({ scenarioId: scenario.id, playlistId: playlist.id })
            return content
        }))
        return res.status(201).json({
            status: 201,
            message: 'Playlist created successfully',
            data: playlist
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const createContentHandler = async (req, res, next) => {
    try {
        const { contentId, type, playlistIds } = req.body;
        const { id: userId } = req.user;
        const playlists = await getPlaylistByIds((playlistIds));
        // check if user is allowed to access this playlists
        playlists.forEach((playlist) => {
            if (userId !== playlist.userId) {
                throw new Error('You are not allowed to access this playlist')
            }
        })
        // create playlist content
        if (type == "theorique") {
            await Promise.all(playlists.map(async (playlist) => {
                const content = await createTheoricalContent({ questionId: parseInt(contentId), playlistId: playlist.id })
                return content
            }))
        } else {
            await Promise.all(playlists.map(async (playlist) => {
                const content = await createPraticalContent({ scenarioId: parseInt(contentId), playlistId: playlist.id })
                return content
            }))
        }
        return res.status(201).json({
            status: 201,
            message: 'Playlist content created successfully',
        });

    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateHandler = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;
        const playlist = await getPlaylistById(parseInt(id));
        if (userId !== playlist.userId) {
            throw new Error('You are not allowed to access this playlist')
        }
        let image = req.body.image;
        const file = req.file;
        if (file) {
            if (image) {
                await deleteFile(image);
            }
            image = await uploadFile(file);
        }
        const { title, isPingged, description } = req.body;
        const updatedPlaylist = await updatePlaylist(parseInt(id), { image, title, isPingged, description });
        return res.status(200).json({
            status: 200,
            message: 'Playlist updated successfully',
            data: updatedPlaylist
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const updateContentHandler = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id, contentId } = req.params;
        const playlist = await getPlaylistById(parseInt(id));
        if (userId !== playlist.userId) {
            throw new Error('You are not allowed to access this playlist')
        }
        const { answer, type } = req.body;
        if (type == "theorique") {
            const updatedContent = await updateTheoriqueContent(parseInt(id), parseInt(contentId), { answer });
            return res.status(200).json({
                status: 200,
                message: 'Playlist content updated successfully',
                data: updatedContent
            });
        } else {

            const updatedContent = await updatePratiqueContent(parseInt(id), parseInt(contentId), { answer });
            return res.status(200).json({
                status: 200,
                message: 'Playlist content updated successfully',
                data: updatedContent
            });
        }
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteHandler = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id } = req.params;
        const playlist = await getPlaylistById(parseInt(id));
        if (userId !== playlist.userId) {
            throw new Error('You are not allowed to access this playlist')
        }
        const deletedPlaylist = await deletePlaylist(parseInt(id));
        if (deletedPlaylist.image) {
            await deleteFile(deletedPlaylist.image);
        }
        return res.status(200).json({
            status: 200,
            message: 'Playlist deleted successfully',
            data: deletedPlaylist
        });
    } catch (error) {
        next(createError(400, error.message));
    }
}

const deleteContentHandler = async (req, res, next) => {
    try {
        const { id: userId } = req.user;
        const { id, contentId } = req.params;
        const { type } = req.body
        const playlist = await getPlaylistById(parseInt(id));
        if (userId !== playlist.userId) {
            throw new Error('You are not allowed to access this playlist')
        }
        if (type == "theorique") {
            const deletedContent = await deleteTheoriqueContent(parseInt(id), parseInt(contentId));
            return res.status(200).json({
                status: 200,
                message: 'Playlist content deleted successfully',
                data: deletedContent
            });
        } else {
            const deletedContent = await deletePratiqueContent(parseInt(id), parseInt(contentId));
            return res.status(200).json({
                status: 200,
                message: 'Playlist content deleted successfully',
                data: deletedContent
            });
        }
    } catch (error) {
        next(createError(400, error.message));
    }
}

module.exports = {
    getAllHandler,
    getOneHandler,
    fetchHandler,
    createContentHandler,
    createHandler,
    updateHandler,
    deleteHandler,
    updateContentHandler,
    deleteContentHandler
}