const prisma = require('../../../config/dbConfig.js')

const getAllPlaylists = async (userId) => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                userId
            },
            include: {
                activityPratique: true,
                activityTeorique: true,
            }
        })
        return playlists
    } catch (error) {
        throw new Error(error.message)
    }
}

const getPlaylistByIds = async (ids) => {
    try {
        const playlists = await prisma.playlist.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            include: {
                activityPratique: true,
                activityTeorique: true,
            }
        })
        return playlists
    } catch (error) {
        throw new Error(error.message)
    }
}

const getPlaylistById = async (id,userId) => {
    try {
        const playlist = await prisma.playlist.findUnique({
            where: {
                id
            },
            include: {
                activityPratique: {
                    include: {
                        scenario: {
                            include: {
                                course:{
                                    include:{
                                        module:{
                                            include:{
                                                schoolYear:true
                                            }
                                        }
                                    }
                                },
                                question: {
                                    include: {
                                        proposition: true
                                    }
                                }
                            }
                        }
                    }
                },
                activityTeorique: {
                    include: {
                        question: {
                            include: {
                                course:{
                                    include:{
                                        module:{
                                            include:{
                                                schoolYear:true
                                            }
                                        }
                                    }
                                },
                                proposition: true
                            }
                        }
                    }
                }
            }
        })
        return playlist
    } catch (error) {
        throw new Error(error.message)
    }
}

const createPlaylist = async (playlist) => {
    try {
        const newPlaylist = await prisma.playlist.create({
            data: playlist
        })
        return newPlaylist
    } catch (error) {
        throw new Error(error.message)
    }
}

const createPraticalContent = async (content) => {
    const newContent = await prisma.activityPratique.create({
        data: content
    })
    return newContent
}

const createTheoricalContent = async (content) => {
    const newContent = await prisma.activityTheorique.create({
        data: content
    })
    return newContent
}

const updatePlaylist = async (id, playlist) => {
    try {
        const updatedPlaylist = await prisma.playlist.update({
            where: {
                id
            },
            data: playlist
        })
        return updatedPlaylist
    } catch (error) {
        throw new Error(error.message)
    }
}

const deletePlaylist = async (id) => {
    try {
        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id
            }
        })
        return deletedPlaylist
    } catch (error) {
        throw new Error(error.message)
    }
}

const updatePratiqueContent = async (id, contentId, content) => {
    try {
        const updatedContent = await prisma.activityPratique.update({
            where: {
                playlistId_scenarioId:{
                    playlistId: id,
                    scenarioId: contentId
                }
            },
            data: content
        })
        return updatedContent
    } catch (error) {
        throw new Error(error.message)
    }
}

const updateTheoriqueContent = async (id, contentId, content) => {
    try {
        const updatedContent = await prisma.activityTheorique.update({
            where: {
                playlistId_questionId: {
                    playlistId: id,
                    questionId: contentId
                }
            },
            data: content
        })
        return updatedContent
    } catch (error) {
        throw new Error(error.message)
    }
}

const deletePratiqueContent = async (id, contentId) => {
    try {
        const deletedContent = await prisma.activityPratique.delete({
            where: {
                playlistId_scenarioId: {
                    playlistId: id,
                    scenarioId: contentId
                }
            }
        })
        return deletedContent
    } catch (error) {
        throw new Error(error.message)
    }
}

const deleteTheoriqueContent = async (id, contentId) => {
    try {
        const deletedContent = await prisma.activityTheorique.delete({
            where: {
                playlistId_questionId: {
                    playlistId: id,
                    questionId: contentId
                }
            }
        })
        return deletedContent
    } catch (error) {
        throw new Error(error.message)
    }
}



module.exports = {
    getPlaylistByIds,
    getAllPlaylists,
    getPlaylistById,
    createPlaylist,
    createPraticalContent,
    createTheoricalContent,
    updatePlaylist,
    deletePlaylist,
    updatePratiqueContent,
    updateTheoriqueContent,
    deletePratiqueContent,
    deleteTheoriqueContent
}