// No types (such as "submit") currently.
// BTW there are no enums in JS...
export const Button = ({ label, onClick }) => {
    return (
        <button onClick={onClick}>{label}</button>
    )
}

// We can provide ClassName here additionaly.
export const Container = ({ className, children }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}
