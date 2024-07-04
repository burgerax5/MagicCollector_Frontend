type Props = {
    width: number
}

const TextSkeleton = ({ width }: Props) => {
    return (
        <div className="text-skeleton" style={{ width: `${width}%` }}></div>
    )
}

export default TextSkeleton