import { useState, useEffect, useRef, useCallback } from "react";
import { FixedSizeList as List } from "react-window";
import "../styles/scanning-and-acquisision-styles.css";
import { getListOfPages } from "../database/batchesDatabase"; // Fetch image IDs

// Simulated API: Fetch image by ID
const fetchImageByID = async (id) => {
  return { id, url: `https://picsum.photos/400/300?random=${id}` };
};

const ScanningAndAcquisision = () => {
  const [images, setImages] = useState([]);
  const [imageIDs, setImageIDs] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const observer = useRef(null);
  const IMAGES_PER_LOAD = 10; // Load in batches of 10

  useEffect(() => {
    const fetchImageIDs = async () => {
      const { data } = getListOfPages(); // Fetch image IDs from API
      setImageIDs(data.map((item) => item.id));
    };
    fetchImageIDs();
  }, []);

  useEffect(() => {
    const loadImages = async () => {
      if (loading || page * IMAGES_PER_LOAD >= imageIDs.length) return;
      setLoading(true);

      const start = page * IMAGES_PER_LOAD;
      const end = start + IMAGES_PER_LOAD;
      const newIDs = imageIDs.slice(start, end);

      const imagePromises = newIDs.map((id) => fetchImageByID(id));
      const imagesData = await Promise.all(imagePromises);

      setImages((prev) => [...prev, ...imagesData]);
      setLoading(false);
    };

    loadImages();
  }, [page, imageIDs, loading]);

  const lastImageRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  const Row = ({ index, style }) => {
    const image = images[index];
    return (
      <div style={style} className="image-container">
        <img
          src={image.url}
          loading="lazy"
          className="image-full"
          alt={`Image ${image.id}`}
          onClick={() => console.log("Image Clicked:", image)}
        />
      </div>
    );
  };

  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Image Gallery</h2>
      <div className="image-list">
        <List
          height={500}
          itemCount={images.length}
          itemSize={320}
          width={"100%"}
        >
          {Row}
        </List>
      </div>
      {loading && <p className="loading-text">Loading...</p>}
      <div ref={lastImageRef} className="load-trigger"></div>
    </div>
  );
};

export default ScanningAndAcquisision;
