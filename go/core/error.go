package core

type BranchQuickLinksError struct {
	IsBranchQuickLinksError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBranchQuickLinksError(code string, msg string, ctx *Context) *BranchQuickLinksError {
	return &BranchQuickLinksError{
		IsBranchQuickLinksError: true,
		Sdk:              "BranchQuickLinks",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BranchQuickLinksError) Error() string {
	return e.Msg
}
