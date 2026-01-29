export default function Pagetitle({text, size='2xl'}) {
    return (
        <div className={`max-6-xs text-${size} text-sky-100 uppercase my-4`}>{text}</div>
    )
}