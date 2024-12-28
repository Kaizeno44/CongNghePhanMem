
    document.getElementById('add-post-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const author = document.getElementById('author').value;
        const category = document.getElementById('category').value;

        alert(`Bài viết đã được thêm:\n\nTiêu đề: ${title}\nNội dung: ${content}\nTác giả: ${author}\nDanh mục: ${category}`);

        // Clear form after submission
        this.reset();
    });
