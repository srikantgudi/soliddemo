
export default function Panel(props) {
    return (
        <div>
            <div class="p-1 px-2 shadow-sm shadow-gray-300 w-[100%]">
                {props.children}
            </div>
        </div>
    )
}
