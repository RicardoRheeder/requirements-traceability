#include "sum.h"

using namespace cunfer::data;

int main(int argc, char *argv[])
{
    SumType<int, bool> a = true;
    auto pos = get_if<bool>(a).has_value();
    auto neg = not get_if<int>(a).has_value();

    return pos and neg ? 0 : 1;
}

