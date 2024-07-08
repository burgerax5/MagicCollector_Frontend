import CardSkeleton from "./CardSkeleton";
import '../../styles/skeleton.css';
import TextSkeleton from "./TextSkeleton";

const CardSkeletons = () => {
    const skeletons = "a".repeat(20).split("");

    return (
        <>
            {skeletons.map((_, i) => <div className="card-skeleton-wrapper" key={`skeleton-wrapper-${i}`}>
                <CardSkeleton key={i} />
                <div key={`text-${i}`} className="card-skeleton-text">
                    <TextSkeleton key={`text-skeleton-1-${i}`} width={100} />
                    <TextSkeleton key={`text-skeleton-2-${i}`} width={60} />
                </div>
            </div>)}
        </>
    )
}

export default CardSkeletons