function SliderTitle({runningCrew}) {
    return (
        <>
            {
                runningCrew.map((crew, idx) => {
                    return(
                            <div className='img-title'>{crew.crewName}</div>
                        );
                      })
                }
        </>
    )
}
export default SliderTitle;