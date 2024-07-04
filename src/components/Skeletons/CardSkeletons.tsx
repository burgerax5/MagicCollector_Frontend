import CardSkeleton from "./CardSkeleton";
import '../../styles/skeleton.css';
import TextSkeleton from "./TextSkeleton";

const CardSkeletons = () => {
    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <>
            {skeletons.map(index => <div className="card-skeleton-wrapper">
                <CardSkeleton key={index} />
                <div className="card-skeleton-text">
                    <TextSkeleton width={100} />
                    <TextSkeleton width={60} />
                </div>
            </div>)}
        </>
    )
}

export default CardSkeletons