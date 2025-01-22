// Define folders and images
const folders = {
    Turkey: {
        title: 'مخيم تركيا',
        images: Array.from({ length: 4 }, (_, i) => `/img/Gallery/Turkey/Turkey ${i + 1}.jpg`),
    },
    Mekkah: {
        title: 'مخيم مكة و المدينة',
        images: Array.from({ length: 25 }, (_, i) => `/img/Gallery/Mekkah/Mekkah ${i + 1}.jpg`),
    },
    Riyadh: {
        title: 'فرع الرياض',
        images: Array.from({ length: 66 }, (_, i) => `/img/Gallery/Riyadh/Riyadh ${i + 1}.jpg`),
    },
    Egypt: {
        title: 'فرع مصر',
        images: Array.from({ length: 17 }, (_, i) => `/img/Gallery/Egypt/Egypt ${i + 1}.jpg`),
    },
    Videos: {
        "title": "فيديوهات",
        "images": [
            {
                src:"/img/Gallery/Videos/videoplayback.mp4",
                name:"كامب هيروز 41"
            },
            {
                src:"/img/Gallery/Videos/إفطار هيروز الأسكندرية_1.mp4",
                name:"فطار هيروز الأسكندرية"
            },
            {
                src:"/img/Gallery/Videos/الإستراحة 1.mp4",
                name:"الإستراحة 1"
            },
            {
                src:"/img/Gallery/Videos/غار حراء 3.mp4",
                name:"غار حراء"
            },
            {
                src:"/img/Gallery/Videos/كامب هيروز 33.avi.mp4",
                name:"كامب هيروز 33"
            },
        ]
    },
};

// Convert folder data into an array of folder objects
const folderList = Object.entries(folders).map(([category, { title, images }]) => ({
    category,
    title,
    images,
    index: 0, // Tracks how many images have been loaded from this folder
}));
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const batchSize = 20;
const imagesPerFolder = batchSize / folderList.length; // Number of images per folder per batch

let isLoading = false; // Prevent multiple simultaneous loads
let currentFilter = 'all'; // Track the current filter

// Function to clear all current images in the gallery, but keep the loader
function clearImages() {
    const images = gallery.querySelectorAll('.imageContainer');
    images.forEach(image => image.remove());
}

// Function to load a batch of images based on selected category
function loadImages(filterCategory = 'all') {
    if (isLoading) return; // Prevent redundant calls
    isLoading = true;
    console.log("Loading images for category:", filterCategory);
    // If the filter changes, clear the images
    if (filterCategory !== currentFilter) {
        clearImages(); // Clear all images before loading new ones
        currentFilter = filterCategory;
        folderList.forEach(folder => folder.index = 0); // Reset the index for each folder
        // Start observing the loader
        observer.observe(loader);
    }

    let imagesLoaded = 0;
    let imagesToLoad = filterCategory === 'all'? imagesPerFolder:batchSize;
    // If filter is 'all', load images from all categories
    folderList.forEach((folder) => {
        // console.log(folder.category,":::",filterCategory);

        if (filterCategory === 'all' || filterCategory === folder.category) {
            for (let i = 0; i < imagesToLoad; i++) {
                console.log(folder.index, folder.images.length);
                if (folder.index < folder.images.length) {
                    const src = folder.images[folder.index];
                    folder.index++; // Move to the next image in the folder

                    // Create the image container
                    const container = document.createElement('div');
                    container.classList.add('imageContainer');
                    
                    if (folder.category === 'Videos') {
                        const placeholder = document.createElement('span');
                        placeholder.classList.add('videoPlaceholder');
                        placeholder.textContent = src.name;//folder.title;

                        // Create the video element
                        const video = document.createElement('video');
                        video.controls = true;  // Add controls to the video player
                        const source = document.createElement('source');
                        source.src = src.src; // Set the video source
                        source.type = 'video/mp4'; // Set the video type

                        // Set the video's alt text and category as data attributes
                        video.dataset.category = folder.category;

                        // Append the source to the video element
                        video.appendChild(source);

                        // Append the placeholder and video to the container
                        container.appendChild(placeholder);
                        container.appendChild(video);
                    } else {
                        const placeholder = document.createElement('span');
                        placeholder.classList.add('imagePlaceholder');
                        placeholder.textContent = folder.title;

                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = folder.title;
                        img.dataset.category = folder.category;
                        img.loading = 'lazy';

                        container.appendChild(placeholder);
                        container.appendChild(img);
                    }

                    

                    // Insert image container before the loader
                    gallery.insertBefore(container, loader);

                    imagesLoaded++;
                }
            }
        }
    });

    // Hide the loader if no more images are available
    if (filterCategory === 'all'){
        if (folderList.every((folder) => folder.index >= folder.images.length)) {
            loader.textContent = '';
            observer.disconnect(); // Stop observing once all images are loaded
        }
    }else{
        if (folderList.some((folder) => folder.index >= folder.images.length) ) {
            loader.textContent = '';
            observer.disconnect(); // Stop observing once all images are loaded
        }
    }
    

    isLoading = false;
}

// Intersection Observer for infinite scrolling
const observer = new IntersectionObserver(
    (entries) => {
        const loaderEntry = entries[0];
        if (loaderEntry.isIntersecting){
            console.log("Touched",!isLoading)
        }
        if (loaderEntry.isIntersecting && !isLoading) {
            loadImages(currentFilter); // Load more images based on the current filter
        }
    },
    {
        root: null,
        rootMargin: '200px', // Trigger loading before the loader is fully visible
        threshold: 0.1, // Trigger when 10% of the loader is visible
    }
);

// Start observing the loader
observer.observe(loader);

// Initial load (all images)
// loadImages(currentFilter);

// Event listener for filter buttons
document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', () => {
        // Remove 'active' class from all items
        document.querySelectorAll('.list-group-item').forEach(i => i.classList.remove('active'));

        // Add 'active' class to the clicked item
        item.classList.add('active');

        // Load images based on the clicked category
        const filterCategory = item.getAttribute('data-filter');
        loadImages(filterCategory);
    });
});
