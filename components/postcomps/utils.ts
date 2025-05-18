interface RObject {
    msg: string,
    status: boolean
}

function checkContent(type: string, title: string, description: string, size: string, forte: string, keywords: string[], images: File[]) {
    const robject: RObject = {
        msg: "",
        status: true
    };

    if (!title || title.trim().length === 0) {
        robject.status = false;
        robject.msg = "Title is required";
        return robject;
    }

    if (title.length > 100) {
        robject.status = false;
        robject.msg = "Title cannot be more than 100 characters.";
        return robject;
    }

    if (!description || description.trim().length === 0) {
        robject.status = false;
        robject.msg = `${type === "post" ? "Story" : "Description"} is required`;
        return robject;
    }

    if (!images || images.length <1) {
        robject.status = false;
        robject.msg = `Atleast One image is required`;
        return robject;
    }

    if (type === "post") {
        if (description.trim().length > 1000) {
            robject.status = false;
            robject.msg = "Story cannot be more than 1000 characters.";
            return robject;
        }

        if (!size || size.trim().length === 0) {
            robject.status = false;
            robject.msg = "Size is required.";
            return robject;
        }

        // if (!collection || collection.trim().length === 0) {
        //     robject.status = false;
        //     robject.msg = "Collection is required.";
        //     return robject;
        // }

        if (!forte || forte.trim().length === 0) {
            robject.status = false;
            robject.msg = "Forte is required.";
            return robject;
        }
    }

    if (type === "storyboard" && description.trim().length > 5000) {
        robject.status = false;
        robject.msg = "Description cannot be more than 5000 characters.";
        return robject;
    }

    if (!keywords || keywords.length === 0) {
        robject.status = false;
        robject.msg = "At least one keyword is required.";
        return robject;
    }

    return robject;
}

export default checkContent;