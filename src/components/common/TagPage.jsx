import React, { useState, useEffect } from 'react';
import { getTagsByStoryId } from '../../api/tagApi';
import Link from 'next/link';

const TagPage = ({ data }) => {
    const storyID = data.storyID;
    const [tagStoryData, setTagStoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function Load() {
            try {
                const data = await getTagsByStoryId(storyID);
                setTagStoryData(data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        Load();
    }, [storyID]);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    return (
        <>
            {tagStoryData && tagStoryData.length > 0 ? (
                <>
                    {tagStoryData.some(tagdata => tagdata.tag) && (
                        <div>
                            <p style={{ fontSize: "2rem", color: "#494E51", lineHeight: "3rem", fontWeight: "600" }}>Tags:</p>
                        </div>
                    )}
                    {tagStoryData.map((tagdata, index) => (
                        tagdata.tag && (
                            <div key={index} style={{ display: 'inline-block', marginRight: '4px', fontWeight: '600' }}>
                                <Link href={`/tagpage/${tagdata?.tag.replace(/\s+/g, "-")}`} target="_blank">
                                    <a style={{ marginRight: "7px", marginLeft: "7px" }}>{tagdata.tag}</a>
                                </Link>
                                {index < tagStoryData.length - 1 && <span>{" | "}</span>}
                            </div>
                        )
                    ))}
                </>
            ) : (
                <></>
                // <h4>No tags available for this story</h4>
            )}
        </>
    );
};

export default TagPage;

