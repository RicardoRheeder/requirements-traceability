/** An implementation of sum types using std::variant
 * Patrick Cunfer
 */

#include <exception>
#include <concepts>
#include <variant>
#include <optional>

namespace cunfer::data {

    /** An explanitory alias */
    template <class... Types>
    using SumType = std::variant<Types...>;

    /** An error checking type,
     * the functional equivalent of exceptions
     */
    template <typename T>
    using Expected = SumType<T, std::exception_ptr>;


    /** Runs a function, and returns an Expected that captures both the return,
     * and exceptions that it may throw.
     */
    template <typename T, std::invocable<T> F>
    const Expected<T> catchException(const F& f);

    template <typename T, class... Types>
    const Expected<T> get(SumType<Types...>& x);

    template <typename T, class... Types>
    const std::optional<T> get_if(const SumType<Types...>& v);


    template <typename T, std::invocable<T> F>
    const Expected<T> catchException(const F& f) {
        try {
            return f();
        } catch(...) {
            return std::current_exception();
        }
    }


    template <typename T, class... Types>
    const Expected<T> get(SumType<Types...>& x) {
        return catchException(std::get(x));
    }

    template <typename T, class... Types>
    const std::optional<T> get_if(const SumType<Types...>& v) {
        auto ptr = std::get_if<T>(&v);

        if (ptr) {
            return *ptr;
        } else {
            return std::optional<T>();
        }
    }

}
