<?php
declare(strict_types=1);

// BranchQuickLinks SDK utility: result_headers

class BranchQuickLinksResultHeaders
{
    public static function call(BranchQuickLinksContext $ctx): ?BranchQuickLinksResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
